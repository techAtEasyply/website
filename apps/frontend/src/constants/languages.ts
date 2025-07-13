export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  cplusplus: "11.2.0",
};

export const BOILERPLATE = {
  javascript: {
    input: `
const input = require('fs').readFileSync(0, 'utf-8').trim().split('\\n');
const nums = input[0].split(' ').map(Number);
const target = Number(input[1]);
`,
    output: `
// User code starts here
console.log(nums, target);
`,
  },
  python: {
    input: `
import sys
input = sys.stdin.read().strip().split('\\n')
nums = list(map(int, input[0].split()))
target = int(input[1])
`,
    output: `
# User code starts here
print(nums, target)
`,
  },
  java: {
    input: `
import java.util.Scanner;
import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] numsStr = sc.nextLine().split(" ");
        int[] nums = new int[numsStr.length];
        for (int i = 0; i < numsStr.length; i++) {
            nums[i] = Integer.parseInt(numsStr[i]);
        }
        int target = Integer.parseInt(sc.nextLine());
`,
    output: `
        // User code starts here
        System.out.println(Arrays.toString(nums) + " " + target);
    }
}
`,
  },
  csharp: {
    input: `
using System;
class Program {
    static void Main(string[] args) {
        string[] numsStr = Console.ReadLine().Split(' ');
        int[] nums = Array.ConvertAll(numsStr, int.Parse);
        int target = int.Parse(Console.ReadLine());
`,
    output: `
        // User code starts here
        Console.WriteLine(string.Join(" ", nums) + " " + target);
    }
}
`,
  },
  php: {
    input: `
<?php
$nums = array_map('intval', explode(' ', trim(fgets(STDIN))));
$target = intval(trim(fgets(STDIN)));
`,
    output: `
// User code starts here
echo implode(' ', $nums) . ' ' . $target . PHP_EOL;
`,
  },
  cplusplus: {
    input: `
#include <iostream>
#include <sstream>
#include <vector>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<int> nums;
    int num;
    while (ss >> num) nums.push_back(num);
    int target;
    cin >> target;
`,
    output: `
    // User code starts here
    for (int i = 0; i < nums.size(); ++i) cout << nums[i] << " ";
    cout << target << endl;
    return 0;
}
`,
  },
};
export const BOILERPLATES: Record<string, { input: string; output: string }> =
  BOILERPLATE;
