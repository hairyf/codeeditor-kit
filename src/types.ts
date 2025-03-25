import type { parsers } from './parser'

export interface PackageJSON {
  name?: string
  version?: string
  description?: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  scripts?: Record<string, string>
  [key: string]: any
}
export interface Files {
  [key: string]: {
    content?: string | Record<string, any>
    isBinary?: boolean
  }
}
export interface EditorExternals {
  css?: string[]
  js?: string[]
}

export type EditorType = keyof typeof parsers

export interface EditorConfig {
  /**
   * @apply codesandbox, stackblitz
   *
   * @description The template to use
   */
  template?: string
  /**
   * @apply codesandbox, stackblitz
   *
   * @description The package.json file for the project
   */
  package?: PackageJSON
  /**
   * @apply stackblitz
   *
   * @description The title of the project
   */
  title?: string
  /**
   * @apply codesandbox, stackblitz
   *
   * @description The files for the project
   */
  files?: Files
  /**
   * @apply codesandbox, stackblitz
   *
   * @description The files to open when the project is loaded
   */
  opens?: string[]
  /**
   * @apply codepen, jsfiddle
   *
   * @description The external resources to load
   */
  externals?: EditorExternals
  /**
   * @apply codepen, jsfiddle
   *
   * @description The HTML content
   */
  html?: string
  /**
   * @apply codepen, jsfiddle
   *
   * @description The CSS content
   */
  css?: string
  /**
   * @apply codepen, jsfiddle
   *
   * @description The JavaScript content
   */
  js?: string
  /**
   * @apply codepen, jsfiddle
   *
   * @description The preprocessors to use
   */
}

export interface EditorResolver<T> {
  (params: T): EditorConfig
}

export interface CodeeditorOptions<T> {
  /**
   * @description enable editors, default all editors
   */
  editors?: EditorType | EditorType[]
  globals?: EditorConfig
  resolve?: EditorResolver<T>
}
