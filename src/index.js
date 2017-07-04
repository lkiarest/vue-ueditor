/**
 * Rich Text Editor based on UEditor & Vue 1.0
 */
(function(factory) {
    if (typeof exports === 'object' &&
        typeof module !== 'undefind') {
        module.exports = factory()
    } else if (typeof define === 'function' && define.amd) {
        define([], factory)
    } else {
        var global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this
        global.VueUEditor = factory()
    }
})(function() {
    var slice = Array.prototype.slice

    /**
     * run ueditor method
     */
    var runUeMethod = function(ue, method) {
        if (!ue || !method) {
            return
        }

        var args = slice.call(arguments, 2)
        return ue[method].apply(ue, args)
    }

    /**
     * run ueditor.selection method
     */
    var runSelectionMethod = function(ue, method) {
        arguments[0] = ue && ue.selection
        return runUeMethod(arguments)
    }

    /**
     * vue component definition
     */
    return {
        name: 'vue-ueditor',
        version: '0.9.2',
        template: '<div :id=\'eid\' class="vue-ueditor"></div>',
        data: function() {
            return {
                ue: null
            }
        },
        props: {
            /**
             * when create UEditor by getEditor with $el instead of dom id, the instance will not be destroyed properly.
             * so if you have more than one editor at one page, please specify the unique eid for each editor.
             */
            eid: {
                type: String,
                default: 'vueditor'
            },
            options: Object,
            content: String,
            enabled: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            /**
             * get ueditor instance
             * @return {Object} UEditor instance
             */
            editor: function() {
                return this.ue
            },
            /**
             * get input content (html)
             * @return {String} input content
             */
            getContent: function() {
                return runUeMethod(this.ue, 'getContent') || ''
            },
            /**
             * set input content (html)
             * @param {String} val input content
             */
            setContent: function(val) {
                return runUeMethod(this.ue, 'setContent', val || '')
            },
            /**
             * get content length
             * @param  {Boolean} ignoreHtml if set to true, all html tags will be ignored
             * @return {Number}            the content length
             */
            getContentLength: function(ignoreHtml) {
                return runUeMethod(this.ue, 'getContentLength', ignoreHtml)
            },
            /**
             * enable editor
             */
            enable: function() {
                return runUeMethod(this.ue, 'setEnabled')
            },
            /**
             * disable editor
             */
            disable: function() {
                return runUeMethod(this.ue, 'setDisabled')
            },
            /**
             * clear all content
             */
            clear: function() {
                return runSelectionMethod(this.ue, 'clear')
            }
        },
        ready: function() {
            var vm = this
            var ue = UE.getEditor(this.eid, this.options)

            ue.addListener( 'ready', function( editor ) {
                vm.ue = ue
                /**
                 * @event ready - editor view is ready
                 */
                vm.$dispatch('ready', editor)

                if (vm.content) {
                    vm.setContent(vm.content)
                }

                if (!vm.enabled) {
                    vm.diable()
                }
            })

            ue.addListener('contentChange', function(editor) {
                /**
                 * @event change - content changed
                 */
                vm.$dispatch('change', vm.getContent())
            })

            vm.$watch('content', function(newVal, oldVal) {
                vm.setContent(newVal)
            })

            vm.$watch('enabled', function(newVal) {
                if (newVal) {
                    vm.enable()
                } else {
                    vm.disable()
                }
            })
        },
        beforeDestroy: function() {
            // console.log(this.ue)
            var ue = this.ue
            if (ue) {
                // ue.removeListener('ready,contentChange')
                ue.destroy()
                this.ue = null
            }
        }
    }
})
