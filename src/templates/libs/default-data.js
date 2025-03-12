
const pdfOutlineInfo = {
    "n1": [
        1,
        139,
        "2 0 R",
        1
    ],
    "n10": [
        2,
        521.5000600000001,
        "31 0 R",
        2
    ],
    "n11": [
        2,
        781.750056,
        "31 0 R",
        2
    ],
    "n12": [
        3,
        679.750056,
        "46 0 R",
        3
    ],
    "n13": [
        4,
        103.75005999999996,
        "54 0 R",
        4
    ],
    "n14": [
        5,
        559.0000600000001,
        "60 0 R",
        5
    ],
    "n15": [
        6,
        66.25030000000004,
        "68 0 R",
        6
    ],
    "n16": [
        6,
        646.0002999999999,
        "68 0 R",
        6
    ],
    "n17": [
        8,
        522.24981,
        "83 0 R",
        8
    ],
    "n18": [
        9,
        28,
        "89 0 R",
        9
    ],
    "n19": [
        9,
        165.24987,
        "89 0 R",
        9
    ],
    "n2": [
        1,
        361,
        "2 0 R",
        1
    ],
    "n20": [
        9,
        240.99981000000002,
        "89 0 R",
        9
    ],
    "n21": [
        9,
        317.49987,
        "89 0 R",
        9
    ],
    "n22": [
        9,
        393.24984,
        "89 0 R",
        9
    ],
    "n23": [
        10,
        28,
        "99 0 R",
        10
    ],
    "n24": [
        11,
        163.00030000000004,
        "107 0 R",
        11
    ],
    "n3": [
        1,
        400.75,
        "2 0 R",
        1
    ],
    "n4": [
        1,
        529.0000600000001,
        "2 0 R",
        1
    ],
    "n5": [
        1,
        656.50006,
        "2 0 R",
        1
    ],
    "n6": [
        1,
        784.750056,
        "2 0 R",
        1
    ],
    "n7": [
        2,
        115,
        "31 0 R",
        2
    ],
    "n8": [
        2,
        154,
        "31 0 R",
        2
    ],
    "n9": [
        2,
        280.00005999999996,
        "31 0 R",
        2
    ]
}

const matrixArrs = [
    [
        2,
        "前言",
        "n1",
        1
    ],
    [
        2,
        "基础模块",
        "n2",
        1
    ],
    [
        4,
        "1. 画布模块",
        "n3",
        2
    ],
    [
        4,
        "2. 坐标模块",
        "n4",
        2
    ],
    [
        4,
        "3. 工具栏模块",
        "n5",
        2
    ],
    [
        4,
        "4. 历史记录模块",
        "n6",
        2
    ],
    [
        2,
        "常用算法",
        "n7",
        1
    ],
    [
        3,
        "碰撞检测（Collision Detection）",
        "n8",
        2
    ],
    [
        4,
        "1. 矩形与矩形检测",
        "n9",
        3
    ],
    [
        4,
        "2. 圆形与圆形碰撞",
        "n10",
        3
    ],
    [
        4,
        "3. 圆形与矩形碰撞",
        "n11",
        3
    ],
    [
        4,
        "4. 分离轴定理（Separating Axis Theorem，简称 SAT）",
        "n12",
        3
    ],
    [
        4,
        "5. 像素检测",
        "n13",
        3
    ],
    [
        2,
        "贝塞尔曲线（Bézier curve）",
        "n14",
        1
    ],
    [
        3,
        "公式",
        "n15",
        2
    ],
    [
        3,
        "SVG 绘制贝塞尔",
        "n16",
        2
    ],
    [
        3,
        "Canvas 绘制贝塞尔",
        "n17",
        2
    ],
    [
        2,
        "变换算法（Transformation Algorithm）",
        "n18",
        1
    ],
    [
        3,
        "缩放矩阵",
        "n19",
        2
    ],
    [
        3,
        "平移矩阵",
        "n20",
        2
    ],
    [
        3,
        "旋转矩阵",
        "n21",
        2
    ],
    [
        3,
        "齐次坐标",
        "n22",
        2
    ],
    [
        2,
        "举一个缩放的例子🌰",
        "n23",
        1
    ],
    [
        2,
        "资料收集",
        "n24",
        1
    ]
]

const title = "图形编辑器提供了一个交互式的界面，允许用户在网页中创建、编辑和操作各种图形元素。 编辑器是比较复杂的项目，由多个功能模块组合而成。一个优秀的编辑器，其必定需要考虑一些特点：模块化、可扩展性、分层架构、设计模式、性能优化。编辑器开发比较侧重的一点是如何交互，基本上是围绕鼠标事件进行交互。"

const pdfInfo = {
  matrixArrs,
  pdfOutlineInfo,
  "count": 11,
  "height": 1123.1875,
  "width": 796.796875
}

const contentStyle = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');
@import url("https://cdn.jsdelivr.net/gh/colorink-top/hwmct@main/dist/result.css");
body{
  font-family: 'Huiwen-mincho', serif;
}
@page:left{
  @left-middle {
    font-size: 2em;
    content: 'https://colorink.top';
    font-family: 'Huiwen-mincho', serif;
    color: red;
    line-height:2;
    writing-mode: vertical-lr;
  }
}
@page:right{
  @left-middle {
    font-size: 2em;
    content: 'https://colorink.top';
    font-family: 'Huiwen-mincho', serif;
    line-height:2;
    writing-mode: vertical-lr;
  }
}
`

const articleContext = {
  articleInfo: {
    title,
    subtitle: '',
    author: ''
  },
  contentStyle,
}

const documentInfo = {
  title: 'test',
  url: 'https://www.baidu.com/test.html',
  origin: 'https://www.baidu.com',
  hostname: 'baidu.com'
}

export const defaultData = {
  certification: {
    vip: false,
    vipType: 'free'
  },
  pdfInfo,
  documentInfo,
  articleContext
}


