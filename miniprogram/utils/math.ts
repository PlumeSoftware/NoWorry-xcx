export const searchWord = (target: string, contentGroup: AnyArray) => {
    const targetArr = target.split('');//目标字库
    const resultGroup: Array<{ content: string, score: number }> = [];
    contentGroup.forEach(content => {
        let score = 0;
        targetArr.forEach(t => {
            if (JSON.stringify(content).indexOf(t) != -1) {
                score += JSON.stringify(content).split("").filter(i => i == t)?.length || 0
            }
        })
        resultGroup.push({ content: content, score: score })
    })

    const result: AnyArray = []
    resultGroup.filter(i => i.score > 1).sort((a, b) => b.score - a.score).forEach(i => result.push(i.content))
    return result;
}
