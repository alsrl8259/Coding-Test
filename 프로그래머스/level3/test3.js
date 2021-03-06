let dp;

function fillDp(board, start){
    let visit = [];
    let when = new Array(board.length).fill(-1);
    let now = start;
    let idx = 0;
    let flag = 2000000;
    while(flag>=0){
        flag--;
        if(dp[now]!=-1){
            let value = dp[now]+1;
            for(let i=visit.length-1; i>=0; i--){
                
                dp[visit[i]] = value++;
            }
            break;
        }
        else if(board[now]===0){
            visit.push(now);
            let value = 1;
            for(let i=visit.length-1; i>=0; i--){
                dp[visit[i]] = value++;
            }
            break;
        }
        else if(when[now]!=-1){
            let value = idx-when[now];
            for(let i=visit.length-1; i>=when[now]; i--){
                dp[visit[i]] = value;
            }
            value++;
            for(let i=when[now]-1; i>=0; i--){
                dp[visit[i]] = value++;
            }
            break;
        }
        else{
            when[now] = idx++;
            visit.push(now);
            now = board[now];
        }
    }
}

function dfs(board, now, when, idx, visit, flag){
    let next = board[now];
    if(dp[now]!==-1){
        return dp[now];
    }
    else if(board[now]===0){
        dp[now] = 1;
        return dp[now];
    }
    else if(when[now]!=-1){
        let value = idx - when[now];
        flag[0] = when[now];
        dp[now] = value;
        // for(let i=visit.length-1; i>=when[now]; i--){
        //     dp[visit[i]] = value;
        // }
        return dp[now];
    }
    else{
        visit.push(now);
        when[now] = idx;
        let value = dfs(board, next, when, idx+1, visit, flag);
        if(flag<=idx){
            dp[now] = value;
            return value;
        }
        // if(dp[now]!==-1)    return value;
        dp[now] = value+1;
        return dp[now];
    }
}
function solution(board) {
    var answer = 0;
    let max = 0;
    board.unshift(-1);
    dp = new Array(board.length).fill(-1);
    for(let i=1; i<board.length; i++){
        if(dp[i]!==-1)  continue;
        let when = new Array(board.length).fill(-1);
        let visit = [];
        let flag = [2000000];
        dfs(board, i, when, 0, visit, flag);
        // fillDp(board,i);
    }
    for(let i=board.length-1; i>=1; i--){
        if(max<dp[i]){
            answer = i;
            max = dp[i];
        }
    }
    return answer;
}