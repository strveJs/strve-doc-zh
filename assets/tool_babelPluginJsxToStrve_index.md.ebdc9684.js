import{_ as s,c as a,o as e,a as n}from"./app.7f31b9b1.js";const b=JSON.parse('{"title":"babelPluginJsxToStrve","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5B89\u88C5","slug":"\u5B89\u88C5"},{"level":2,"title":"\u7528\u6CD5","slug":"\u7528\u6CD5"},{"level":2,"title":"\u9009\u9879","slug":"\u9009\u9879"},{"level":3,"title":"tag=html","slug":"tag-html"}],"relativePath":"tool/babelPluginJsxToStrve/index.md"}'),l={name:"tool/babelPluginJsxToStrve/index.md"},o=n(`<h1 id="babelpluginjsxtostrve" tabindex="-1">babelPluginJsxToStrve <a class="header-anchor" href="#babelpluginjsxtostrve" aria-hidden="true">#</a></h1><p><a href="https://www.npmjs.com/package/babel-plugin-jsx-to-strve" target="_blank" rel="noopener noreferrer">babel-plugin-jsx-to-strve</a> \u662F\u4E00\u6B3E babel \u63D2\u4EF6\uFF0C\u5C06 JSX \u8F6C\u6362\u4E3A\u4E0E Strve \u4E00\u8D77\u4F7F\u7528\u7684\u6807\u8BB0\u6A21\u677F\u3002</p><h2 id="\u5B89\u88C5" tabindex="-1">\u5B89\u88C5 <a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a></h2><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#EEFFFF;">npm install babel-plugin-jsx-to-strve</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><a href="/strve-doc-zh/tool/createStrveApp/">CreateStrveApp</a> \u9879\u76EE\u811A\u624B\u67B6\u5DE5\u5177\u5DF2\u9ED8\u8BA4\u5B89\u88C5\uFF0C\u9009\u62E9<code>strve-jsx</code> \u6216\u8005 <code>strve-jsx-apps</code> \u6A21\u7248\u3002</p></div><h2 id="\u7528\u6CD5" tabindex="-1">\u7528\u6CD5 <a class="header-anchor" href="#\u7528\u6CD5" aria-hidden="true">#</a></h2><p>\u5728\u4F60\u7684 Babel \u914D\u7F6E\u4E2D\uFF08<code>.babelrc</code>\u3001<code>babel.config.js</code>\u3001<code>package.json</code> \u4E2D\u7684<code>babel</code>\u5B57\u6BB5\u7B49\uFF09\uFF0C\u6DFB\u52A0\u63D2\u4EF6\uFF1A</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">plugins</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: [</span></span>
<span class="line"><span style="color:#F07178;">    [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">babel-plugin-jsx-to-strve</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">  ]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="\u9009\u9879" tabindex="-1">\u9009\u9879 <a class="header-anchor" href="#\u9009\u9879" aria-hidden="true">#</a></h2><h3 id="tag-html" tabindex="-1"><code>tag=html</code> <a class="header-anchor" href="#tag-html" aria-hidden="true">#</a></h3><p>\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C<a href="https://www.npmjs.com/package/babel-plugin-jsx-to-strve" target="_blank" rel="noopener noreferrer">babel-plugin-jsx-to-strve</a> \u5C06\u5904\u7406\u6240\u6709\u5E26\u6709\u540D\u4E3A <code>html</code> \u7684\u6807\u8BB0\u51FD\u6570\u7684\u6807\u8BB0\u6A21\u677F\u3002 \u8981\u4F7F\u7528\u4E0D\u540C\u7684\u540D\u79F0\uFF0C\u8BF7\u5728 Babel \u914D\u7F6E\u4E2D\u4F7F\u7528 <code>tag</code> \u9009\u9879\uFF1A</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">{</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">plugins</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[</span></span>
<span class="line"><span style="color:#F07178;">  [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">babel-plugin-jsx-to-strve</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">tag</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">html</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">]</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,12),p=[o];function t(c,r,i,d,F,h){return e(),a("div",null,p)}var u=s(l,[["render",t]]);export{b as __pageData,u as default};