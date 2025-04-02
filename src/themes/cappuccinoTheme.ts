import { alphaToHex } from 'utils'
import beginningImage from '../../assets/images/beginning-cappuccino@2x.png'

const cappuccinoPalette = {
  neutral: {
    '0': '255, 255, 255',
    '10': '247, 246, 241', // popper
    '15': '243, 240, 233', // hover, inverted, toggle group bg
    '20': '239, 233, 222', // hover on inverted, border
    '25': '233, 227, 216', // bg
    '30': '226, 217, 200', // secondary surface
    '35': '216, 205, 185', // secondary hover
    '40': '199, 187, 167', // Not active toggle in Appearance toolbar
    '100': '61, 52, 40', // text
  },
  green: {
    '100': '88, 216, 88',
  },
  red: {
    '100': '234, 47, 47',
  },
  highlight: {
    main: '233, 227, 216',
    surface: '61, 52, 40',
  },
  tags: {
    pink: '240, 91, 202',
    green: '16, 170, 153',
    orange: '255, 123, 73',
    yellow: '255, 204, 94',
    blue: '65, 170, 235',
    violet: '192, 138, 223',
    lime: '132, 221, 90',
    red: '255, 83, 93',
    brown: '132, 93, 73',
    navy: '86, 103, 218',
  },
}

const cappuccinoTheme = {
  color: {
    pure: cappuccinoPalette.neutral[0],
    primary: {
      // base colors
      main: cappuccinoPalette.neutral[100],
      surface: cappuccinoPalette.neutral[25],
      hover: cappuccinoPalette.neutral[30],
      border: cappuccinoPalette.neutral[30],
    },
    secondary: {
      // base colors
      main: cappuccinoPalette.neutral[100],
      surface: cappuccinoPalette.neutral[30],
      // colors for states
      hover: cappuccinoPalette.neutral[35],
    },
    popper: {
      // base colors
      pure: cappuccinoPalette.neutral[0],
      main: cappuccinoPalette.neutral[100],
      inverted: cappuccinoPalette.neutral[15],
      border: cappuccinoPalette.neutral[20],
      surface: cappuccinoPalette.neutral[10],

      // colors for states
      active: cappuccinoPalette.neutral[20],
      hover: cappuccinoPalette.neutral[15],
      hoverInverted: cappuccinoPalette.neutral[20],
      disabled: cappuccinoPalette.neutral[40],
      input: cappuccinoPalette.neutral[40],
    },
    success: {
      main: cappuccinoPalette.green[100],
    },
    error: {
      main: cappuccinoPalette.red[100],
    },
    highlight: {
      main: cappuccinoPalette.highlight['main'],
      surface: cappuccinoPalette.highlight['surface'],
    },
    tags: {
      pink: cappuccinoPalette.tags['pink'],
      green: cappuccinoPalette.tags['green'],
      orange: cappuccinoPalette.tags['orange'],
      yellow: cappuccinoPalette.tags['yellow'],
      blue: cappuccinoPalette.tags['blue'],
      violet: cappuccinoPalette.tags['violet'],
      lime: cappuccinoPalette.tags['lime'],
      red: cappuccinoPalette.tags['red'],
      brown: cappuccinoPalette.tags['brown'],
      navy: cappuccinoPalette.tags['navy'],
    },
    code: {
      main: '148, 94, 30',
      surface: cappuccinoPalette.neutral[100],
    },
    productFree: {
      main: cappuccinoPalette.neutral[100],
      surface: cappuccinoPalette.neutral[15],
      popper: cappuccinoPalette.neutral[25],
    },
    productWriter: {
      main: '25, 76, 45',
      surface: '204, 226, 195',
      popper: '220, 239, 213',
    },
  },
  style: {
    shadow: `0px 0px 0px 4px rgba(${cappuccinoPalette.neutral[25]})`,
    highlightBlendMode: 'normal',
    beginningImage: `url("${beginningImage}")`,
    handStriketrough:
      'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjYiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCA2NiAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNMiAxMy4zNjIxQzMuNjI0OTIgMTAuNTg3NSA1LjE2NDUyIDcuNzcwMzkgNi43NDM2NiA0Ljk3MzA1QzcuMDk1NyA0LjM0OTQ1IDcuNDkwNzkgMy43ODA1NSA3LjcyNTEgMy4xMDM2M0M3Ljk3NjU3IDIuMzc3MTkgOC4wOTg5OSAyLjg1ODQ3IDguMDk4OTkgMy4zNjA2OEM4LjA5ODk5IDQuODc5NTggOC4wOTg5OSA2LjM5ODQ5IDguMDk4OTkgNy45MTczOUM4LjA5ODk5IDkuODc3NjYgNy44ODg2OCAxMS44MjEyIDcuODg4NjggMTMuNzgyN0M3Ljg4ODY4IDE0LjMwNzQgNy41NzQwNSAxNS45Njg0IDcuOTkzODMgMTYuMzg4MkM4LjExMTUgMTYuNTA1OSA4LjQ5MTQ4IDE0Ljg5MzIgOC41MTk2MSAxNC43MTc0QzguNzQ4OTQgMTMuMjg0MSA5LjQ0MDg1IDExLjc4MDkgOS45NDUwNCAxMC40MTc3QzEwLjg0MzcgNy45ODgxMSAxMi4wMTc1IDUuNjgzNDkgMTIuOTgyOSAzLjMxMzk0QzEzLjA1MyAzLjE0MTg1IDEzLjU0NTkgMi4zMjM1IDEzLjU2NyAyLjg5MzMyQzEzLjYzNDggNC43MjE2NyAxMy42MDIgNi41ODY2NiAxMy40NjE5IDguNDA4MTJDMTMuMjgwNyAxMC43NjMyIDEzLjMwNTMgMTMuMTMyOCAxMy4xNTgxIDE1LjQ4ODZDMTMuMDk4MSAxNi40NDg5IDEyLjk0ODMgMTcuNzU3NiAxMy4xNTgxIDE4LjcwMTZDMTMuMzM1NyAxOS41MDA4IDE0LjQxODYgMTcuMTUzMyAxNC40MzE3IDE3LjEyNDNDMTUuNTM1OSAxNC42NzA1IDE2LjYwMzIgMTIuMjEwNCAxNy41NjI5IDkuNjkzMzRDMTguMjE3MiA3Ljk3NzUxIDE4Ljg2NTMgNi4yNjc1NSAxOS40NTU3IDQuNTI5MDdDMTkuNTE3NCA0LjM0NzQgMjAuMDgzNyAyLjcwMDA5IDIwLjI5NyAyLjk0MDA2QzIwLjk0ODMgMy42NzI3NyAyMC41MDczIDYuMDQ2NTUgMjAuNTA3MyA2LjkzNTk1QzIwLjUwNzMgOC45NjkzNiAyMC4yOTcgMTAuOTc5IDIwLjI5NyAxMy4wMTE2QzIwLjI5NyAxMy4xNzYyIDIwLjE3ODYgMTQuNjAwNiAyMC40MTM4IDE0LjYwMDZDMjEuMDg2OCAxNC42MDA2IDIyLjIzMTEgMTIuMDMxMyAyMi41MDUyIDExLjU3NDVDMjMuNTcwMiA5Ljc5OTUgMjQuNjA2NiA4LjAyMDU3IDI1LjY0ODIgNi4yMzQ5MUMyNi4xNzcgNS4zMjg0MSAyNi41NzMxIDQuMDU1ODcgMjcuMjM3MiAzLjI2NzIxQzI3LjYxNDcgMi44MTg4NyAyNy42NTc4IDIuODAyNDUgMjcuNjU3OCAzLjQ3NzUyQzI3LjY1NzggNS4wMDQwNSAyNy42NzExIDYuNTMxMTYgMjcuNjU3OCA4LjA1NzZDMjcuNjI5IDExLjM3MjUgMjYuMzk2IDE0LjU4NjggMjYuMzk2IDE3Ljg4MzdDMjYuMzk2IDE4LjI0NzYgMjcuMzQzIDE2LjQxNjEgMjcuNDU5MiAxNi4xNjYyQzI4LjQyNTUgMTQuMDg4NiAyOS42NDE0IDEyLjEzMDkgMzAuNzA3MyAxMC4xMDIzQzMxLjY3NjQgOC4yNTc5MSAzMi43MTc2IDYuMzQzNTIgMzMuOTQzNyA0LjY1NzU5QzM0LjMxNTggNC4xNDU5OCAzNC44MTU5IDIuOTM5NjkgMzUuNDM5MyAyLjY4MzAxQzM1LjczNDcgMi41NjEzNiAzNS42NTIxIDQuOTk5NSAzNS42NDk2IDUuMjA2NzNDMzUuNjI1IDcuMjIwNjQgMzUuMTc0NyA5LjIzODEgMzQuODA4NCAxMS4yMTIyQzM0LjU3MzUgMTIuNDc3OCAzNC4yMjIgMTMuODAwMSAzNC4xNzc0IDE1LjA5MTNDMzQuMTQ2NSAxNS45ODgyIDM0LjM1MDggMTUuODAwOCAzNC44MiAxNS4xMjY0QzM3LjI2ODkgMTEuNjA2MiAzOS40NTExIDcuODc2NTMgNDEuOTcwNiA0LjQxMjIzQzQyLjc3MzUgMy4zMDgyNSA0NC41Nzg2IDAuNDM3NjA5IDQ0LjIyNTYgMy41NzA5OUM0My44MDQ4IDcuMzA1NDMgNDIuMjk1OSAxMC42ODM2IDQxLjcwMTkgMTQuMzY2OUM0MS42NTM4IDE0LjY2NDkgNDEuMDQyMyAxNS45NjQyIDQxLjM3NDcgMTYuMjU5N0M0MS44NTcxIDE2LjY4ODUgNDMuMzMyOSAxNC4wMzU0IDQzLjQ1NDQgMTMuODY0NUM0NS44ODI0IDEwLjQ1MDEgNDcuNTg3NyA2LjYyMDA5IDQ5LjgyMjIgMy4wOTE5NUM1MC4wMTgzIDIuNzgyMjcgNTAuMzUwNCAxLjg2NDE4IDUwLjg4NTQgMi4wMTcwM0M1MS4yNDQxIDIuMTE5NTMgNTEuMDA1MSA1LjI3Mzk0IDUxLjAwMjIgNS41ODA2MkM1MC45NjcyIDkuMjU5MiA1MC4xNjEgMTIuODc5MSA1MC4xNjEgMTYuNTYzNUM1MC4xNjEgMTYuNjYwNiA1MC4wNzA1IDE3Ljk2OTIgNTAuMzcxMyAxNy42ODUxQzUxLjQ1NDYgMTYuNjYyIDUyLjExODYgMTQuODUzNSA1Mi43ODk5IDEzLjU2MDdDNTMuNzYyMSAxMS42ODgzIDU0LjY4NjYgOS44MDIyOSA1NS42MjkgNy45MTczOUM1Ni4xMjEyIDYuOTMzMDEgNTYuNTg1OCA1LjU4MDQ5IDU3LjMxMTUgNC43NTEwNkM1OC45MDE5IDIuOTMzNDYgNTguMzYzMSA3LjE2ODc5IDU4LjM2MzEgOC4xMDQzNEM1OC4zNjMxIDEwLjI5NzMgNTcuOTQyNSAxMi40NTU1IDU3Ljk0MjUgMTQuNjIzOUM1Ny45NDI1IDE1LjQ1MzEgNTguNzA2MiAxNC4xMzkxIDU4LjgzMDQgMTMuODk5NUM1OS43Njg4IDEyLjA4OTkgNjAuNjIyNiAxMC4yMjI2IDYxLjYxMTIgOC40NDMxN0M2Mi4yODU5IDcuMjI4NjMgNjIuNjk5MyA1LjY1NjU2IDYzLjUyNzQgNC41NTI0M0M2NC40Mzc0IDMuMzM5MSA2NC40NjIxIDMuOTI3MTMgNjQuNDYyMSA1LjA2NjUyQzY0LjQ2MjEgNy4xNTM3MyA2My44MzExIDkuMTgwMDggNjMuODMxMSAxMS4yNTkiIHN0cm9rZT0iIzlBNzc0RiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==)',
  },
}

export { cappuccinoTheme }
