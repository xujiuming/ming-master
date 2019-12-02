<div class="navSection">
    <div class="item">
        <div id="word_cloud_view_id"></div>
    </div>
</div>
<script>
    let echarts = require('echarts/lib/echarts')
    require('echarts-wordcloud');
    import 'echarts/theme/macarons.js';

    export default {
        name: 'word_cloud_index',
        props: {
            word_list: {
                type: Array,
                default: []
            }
        },
        data: () => ({
            word_cloud_view: null,
            word_cloud_options: {},
        }),
        methods: {
            draw_word_cloud_view() {
                if (this.word_cloud_view) {
                    this.word_cloud_view.dispose();
                }
                this.word_cloud_view = document.getElementById('word_cloud_view_id') && echarts.init(document.getElementById('word_cloud_view_id'), 'macarons');
                this.word_cloud_view && this.word_cloud_view.setOption(this.word_cloud_options);
            },
            init_view_data() {
                let word_cloud_series = [{
                    type: 'wordCloud',
                    shape: 'circle',
                    left: 'center',
                    top: 'center',
                    width: '100%',
                    height: '100%',
                    right: null,
                    bottom: null,
                    sizeRange: [30, 60],
                    rotationRange: [0, 0],
                    autoSize: {
                        enable: true,
                        minSize: 6
                    },
                    textPadding: 0,
                    rotationStep: 45,
                    gridSize: 8,
                    drawOutOfBound: false,
                    textStyle: {
                        normal: {
                            fontFamily: 'sans-serif',
                            fontWeight: 'bold',
                            color: function () {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 256),
                                    Math.round(Math.random() * 256),
                                    Math.round(Math.random() * 256)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: this.word_list
                }];

                this.word_cloud_options = {
                    series: word_cloud_series
                };
                this.word_cloud_view.setOption(this.word_cloud_options)
            },
        },
        mounted() {
            this.draw_word_cloud_view()
            this.init_view_data()
        },
        render(h) {
            return h('div', {
                attrs: {id: 'word_cloud_view_id'},
                style: {
                    height: '400px',
                    width: '400px'
                }
            })
        }
    }
</script>

<style>
    .navSection {
        display: flex;
        /*justify-content: center;*/
        align-items: center;
        flex-wrap: wrap;
    }

    .item {
        width: 80%;
        margin: 1%;
        height: 300px;
    }
</style>