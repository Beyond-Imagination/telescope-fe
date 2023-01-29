import React from 'react'
import Router from 'next/router'
import { isInstanceOfAPIError } from '../../utils/api/error'
import ErrorPage from '../../pages/_error'

type ErrorBoundaryProps = React.PropsWithChildren<{}>

interface ErrorBoundaryState {
  error: Error | null
  errorInfo: any
}

const errorBoundaryState: ErrorBoundaryState = {
  error: null,
  errorInfo: null,
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = errorBoundaryState
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  private resetState = () => {
    this.setState(errorBoundaryState)
  }

  private setError = (error: Error) => {
    this.setState({ error })
  }
  private handleError = (event: ErrorEvent) => {
    this.setError(event.error)
    event.preventDefault?.()
  }

  private handleRejectedPromise = (event: PromiseRejectionEvent) => {
    event?.promise?.catch?.(this.setError)
    event.preventDefault?.()
  }

  componentDidMount() {
    window.addEventListener('error', this.handleError)
    window.addEventListener('unhandledrejection', this.handleRejectedPromise)

    Router.events.on('routeChangeStart', this.resetState)
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleError)
    window.removeEventListener('unhandledrejection', this.handleRejectedPromise)

    Router.events.off('routeChangeStart', this.resetState)
  }

  render() {
    const { error } = this.state

    if (isInstanceOfAPIError(error)) {
      return <ErrorPage message={error.message} statusCode={error.statusCode} />
    }
    if (error) {
      return <ErrorPage message={error.message} statusCode={500} />
    }

    return this.props.children
  }
}
