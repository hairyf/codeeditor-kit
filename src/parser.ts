import type { EditorConfig } from './types'
import sdk from '@stackblitz/sdk'
import { getParameters } from 'codesandbox/lib/api/define'

export const parsers = {
  async stackblitz(config: Required<EditorConfig>) {
    const { files, opens, template, title } = config
    for (const [k, v] of Object.entries(files)) {
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      files[`${k}`] = typeof v.content === 'object'
        ? JSON.stringify(v.content, null, 2)
        : v.content
    }
    sdk.openProject(
      {
        title: title || 'demo',
        files: files as any,
        template: template as 'node',
      },
      {
        newWindow: true,
        openFile: opens,
      },
    )
  },
  async codesandbox(config: Required<EditorConfig>) {
    const { files, opens, template } = config
    files['.codesandbox/Dockerfile'] = {
      content: [
        'FROM node:20',
        'ENV COREPACK_ENABLE_DOWNLOAD_PROMPT = 0',
        'RUN corepack enable',
      ].join('\n'),
    }
    const parameters = getParameters({
      files: files as any,
      template: template as 'node',
    })
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = 'https://codesandbox.io/api/v1/sandboxes/define'
    form.target = '_blank'
    form.innerHTML = `
      ${opens?.length
          ? `<input type="hidden" name="query" value="file=${opens?.[0]}">`
          : ''
      }
      <input type="hidden" name="environment" value="server">
      <input type="hidden" name="hidedevtools" value="1">
      <input type="hidden" name="parameters" value="${parameters}">
    `
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  },
  async codepen(config: Required<EditorConfig>) {
    const { html, css, js, externals } = config
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = 'https://codepen.io/pen/define'
    form.target = '_blank'
    form.innerHTML = `
      <input type="hidden" name="data" value="${JSON.stringify({
        editors: '101',
        layout: 'left', // left, right, top
        html_pre_processor: 'none',
        css_pre_processor: 'none',
        css_prefix: 'autoprefixer',
        js_pre_processor: 'babel',
        head: '<meta name="viewport" content="width=device-width">',
        js_external: externals?.js || '',
        css_external: externals?.css || '',
        html: html || '',
        css: css || '',
        js: js || '',
      })}">
    `
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  },
  async jsfiddle(config: Required<EditorConfig>) {
    const { html, css, js, externals } = config
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = 'https://jsfiddle.net/api/post/library/pure/'
    form.target = '_blank'
    form.innerHTML = `
      <input type="hidden" name="html" value="${html || ''}">
      <input type="hidden" name="css" value="${css || ''}">
      <input type="hidden" name="js" value="${js || ''}">
      <input type="hidden" name="js_wrap" value="l">
      <input type="hidden" name="resources" value="${[
        ...(externals?.css || []),
        ...(externals?.js || []),
      ].join(',')}">
    `
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  },
}
