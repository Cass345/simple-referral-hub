import { ReactNode, ComponentType } from "react"

export type ChartThemes = {
  light: string
  dark: string
}

export type ChartConfig = {
  [k in string]: {
    label?: ReactNode
    icon?: ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof ChartThemes, string> }
  )
}

export type ChartContextProps = {
  config: ChartConfig
}