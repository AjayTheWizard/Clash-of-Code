import React from 'react'
import ReactMarkdown from 'react-markdown'
import 'github-markdown-css/github-markdown.css'

const markdown = `## Problem Statement

Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

### Example:

**Input:** nums = [2,7,11,15], target = 9

**Output:** [0,1]

**Output Explanation:** Because nums[0] + nums[1] == 9, we return [0, 1].

\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

[LeetCode Problem Link](https://leetcode.com/problems/two-sum/)

### Constraints:

- 2 <= nums.length <= 10^3
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.
`

const Markdown: React.FC = () => {
  return (
    <div className="overflow-y-auto h-full">
      <div className="mx-auto p-6 prose prose-code:before:content-none prose-code:after:content-none prose-headings:text-inherit prose-code:text-inherit prose-strong:text-inherit max-w-full markdown-body">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  )
}

export default Markdown
