job("[FE] Merge Request") {
    startOn {
        codeReviewOpened {
            branchToCheckout = CodeReviewBranch.MERGE_REQUEST_SOURCE
        }
        gitPush {
            anyRefMatching {
                +"refs/merge/*/head"
            }
        }
    }

    container(displayName = "build & test", image = "node:alpine") {
        cache {
            // package.json의 내용을 해시를 하고 그 값을 캐싱키로 사용
            // 이를 통해 package.json이 동일하면 캐시를 사용하도록 유도하고 달라지면 캐시를 새로 만든다
            // 참고: https://www.jetbrains.com/help/space/cache-files.html#upload-and-reuse-cached-files
            storeKey = "npm-{{ hashFiles('package.json') }}"

            // Fallback 옵션인데 불필요 할것 같아서 주석처리
            /*restoreKeys {
                +"npm-master"
            }*/

            // 캐시가 들어갈 디렉토리
            localPath = "node_modules"
        }

        shellScript {
            content = """
                set -e
                if [ -z "${'$'}(ls -A node_modules)" ]; then
                    # 캐시 디렉토리가 비어있을때에만 yarn install 실행
                    yarn install
                fi
                yarn build
            """
        }
    }
}

job("[FE] Deploy") {
    startOn {
        gitPush {
            anyBranchMatching {
                +"main"
                +"develop"
            }
        }
    }

    container(displayName = "build", image = "node:alpine") {

        cache {
            // package.json의 내용을 해시를 하고 그 값을 캐싱키로 사용
            // 이를 통해 package.json이 동일하면 캐시를 사용하도록 유도하고 달라지면 캐시를 새로 만든다
            // 참고: https://www.jetbrains.com/help/space/cache-files.html#upload-and-reuse-cached-files
            storeKey = "npm-{{ hashFiles('package.json') }}"

            // Fallback 옵션인데 불필요 할것 같아서 주석처리
            /*restoreKeys {
                +"npm-master"
            }*/

            // 캐시가 들어갈 디렉토리
            localPath = "node_modules"
        }

        shellScript {
            content = """

                if [ ${'$'}JB_SPACE_GIT_BRANCH == "refs/heads/develop" ]; then
                    cat .env.development > .env.production
                fi

                if [ ${'$'}JB_SPACE_GIT_BRANCH == "refs/heads/main" ]; then
                    echo "NEXT_PUBLIC_NEWRELIC_AGENT_ID={{ project:NEXT_PUBLIC_NEWRELIC_AGENT_ID_PROD }}" >> .env.production
                else
                    echo "NEXT_PUBLIC_NEWRELIC_AGENT_ID={{ project:NEXT_PUBLIC_NEWRELIC_AGENT_ID_DEV }}" >> .env.production
                fi

                if [ -z "${'$'}(ls -A node_modules)" ]; then
                    # 캐시 디렉토리가 비어있을때에만 yarn install 실행
                    yarn install
                fi
                yarn build
                cp -r out ${'$'}JB_SPACE_FILE_SHARE_PATH/out
            """
        }
    }

    container(displayName = "deploy", image = "amazon/aws-cli") {
        env["AWS_ACCESS_KEY_ID"] = "{{ project:AWS_ACCESS_KEY_ID }}"
        env["AWS_SECRET_ACCESS_KEY"] = "{{ project:AWS_SECRET_ACCESS_KEY }}"

        shellScript {
            content = """
                ls -al ${'$'}JB_SPACE_FILE_SHARE_PATH/out
                aws --version

                export AWS_ACCESS_KEY_ID=${'$'}AWS_ACCESS_KEY_ID
                export AWS_SECRET_ACCESS_KEY=${'$'}AWS_SECRET_ACCESS_KEY
                export AWS_DEFAULT_REGION=ap-northeast-2

                echo ${'$'}JB_SPACE_GIT_BRANCH

                if [ ${'$'}JB_SPACE_GIT_BRANCH == "refs/heads/develop" ]; then
                    aws s3 sync ${'$'}JB_SPACE_FILE_SHARE_PATH/out s3://telescope-frontend-dev/out
                    aws cloudfront create-invalidation --distribution-id E2AVTDGAEHS1L6 --paths "/*"
                elif [ ${'$'}JB_SPACE_GIT_BRANCH == "refs/heads/main" ]; then
                    aws s3 sync ${'$'}JB_SPACE_FILE_SHARE_PATH/out s3://telescope-frontend-main/out
                    aws cloudfront create-invalidation --distribution-id EWGFT8EDWFGK --paths "/*"
                else
                    echo "Deployment is not supported on this branch."
                fi
            """
        }
    }
}
