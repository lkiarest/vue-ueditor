UEditor based Rich Text Editor component for vue 1.x

### install
`` shell
npm i vueueditor -S
``

### use

```html
<!--
    // should import UEditor libs at index.html first
    <script src='http://res.wisedu.com/bower_components/ueditor/ueditor.config.js'></script>
    <script src='http://res.wisedu.com/bower_components/ueditor/ueditor.all.min.js'></script>
 -->
<template>
    <div>
        <ueditor v-ref:ue :options='editorOpts' :content='content' :enabled='enabled'></ueditor>
    </div>
</template>
<script>
    import Ueditor from 'vueueditor'
    export default {
        data: () => ({
            content: 'Hello World',
            editorOpts: { // refer to 'http://fex.baidu.com/ueditor/#start-config'
                maximumWords: 500
            },
            enabled: true
        }),
        components: {Ueditor}
    }
</script>
```

### options
Refer to [UEditor Start Config](http://fex.baidu.com/ueditor/#start-config)

### methods

#### editor()
Get original UE instance, then you can do more things with the [UEditor Document](http://fex.baidu.com/ueditor/)
```javascript
var editor = this.$refs.ue.editor()
```

#### getContent()
Get html content from editor
```javascript
var content = this.$refs.ue.getContent()
```

#### setContent(val)
Set html content to editor
```javascript
var content = this.$refs.ue.setContent('Hello World')
// or change the bound data model
this.content = 'Hello World'
```

#### enable()
Enable to edit
```
this.$refs.ue.enable()
// or change the bound data model
this.enabled = true
```

#### disable()
Disable to edit
```
this.$refs.ue.disable()
// or change the bound data model
this.enabled = false
```

#### clear()
Clear all contents
```
this.$refs.ue.clear()
```

#### getContentLength(ignoreHtml)
Get length of content

**ignoreHtml** will ignore all html tags if set to true
```
this.$refs.ue.getContentLength()
```