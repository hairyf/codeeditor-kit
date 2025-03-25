import type { CodeeditorOptions, EditorConfig, EditorResolver } from './types'
import { parsers } from './parser'
import { merges } from './util'

export class Codeeditor<T = any> {
  public $resolve: EditorResolver<T>
  public $globals: EditorConfig
  constructor(options: CodeeditorOptions<T>) {
    this.$resolve = options.resolve || (() => ({}))
    this.$globals = options.globals || {}
  }

  resolve(params: T) {
    const options = merges(
      { ...(this.$globals || {}) },
      { ...(this.$resolve?.(params) || {}) },
    )
    const opens = options.opens || this.$globals?.opens

    options.files = options.files ?? {}
    options.template = options.template ?? 'node'

    for (const file of Object.values(options.files))
      file.isBinary = file.isBinary ?? false
    return {
      ...options,
      files: options.files as Record<string, any>,
      opens,
    } as Required<EditorConfig>
  }

  open(editor: keyof typeof parsers, params: T) {
    return parsers[editor](this.resolve(params))
  }
}
