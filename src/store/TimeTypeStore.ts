import { create, StateCreator } from 'zustand'

interface TimeTypeStoreType {
    timeType: string
    setTimeType: (timeType: string) => void
}

export const useTimeTypeStore = create<TimeTypeStoreType>(set => ({
    timeType: 'week',
    setTimeType: (timeType: string) => set({ timeType }),
}))
