declare module '*.md' { 
  const src: {
    html: string
    raw: string
    filename: string
  }
  export default src
}
declare module '*.txt' { 
  const src: {
    name: string
    age: number
    score: number
  }
  export default src
}
declare module '*.png' { 
  const src: string
  export default src
}
declare module '*.svg' { 
  const src: string
  export default src
}
declare module '*.css' { 
  const src: any
  export default src
}