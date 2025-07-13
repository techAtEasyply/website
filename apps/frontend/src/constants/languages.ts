export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  cpp: "11.2.0",
};

export const BOILERPLATES: Record<string, string> = {
  javascript: `
const input = require('fs').readFileSync(0, 'utf-8').trim().split('\\n');
const nums = input[0].split(' ').map(Number);
const target = Number(input[1]);
//-------------------------------
// Example function
function sumArray(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
//-------------------------------
// User code starts here
console.log(nums, target);
`,
  python: `
import sys
input = sys.stdin.read().strip().split('\\n')
nums = list(map(int, input[0].split()))
target = int(input[1])
#-------------------------------
# Example function
// def sum_array(arr):
//     return sum(arr)
#-------------------------------
# User code starts here
print(nums, target)
`,
  java: `
import java.util.Scanner;
import java.util.Arrays;
public class Main {
    // -------------------------------
    // Example function
    // public static int sumArray(int[] arr) {
    //     int sum = 0;
    //     for (int num : arr) sum += num;
    //     return sum;
    // }
    // ------------------------------
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] numsStr = sc.nextLine().split(" ");
        int[] nums = new int[numsStr.length];
        for (int i = 0; i < numsStr.length; i++) {
            nums[i] = Integer.parseInt(numsStr[i]);
        }
        int target = Integer.parseInt(sc.nextLine());
        // User code starts here
        System.out.println(Arrays.toString(nums) + " " + target);
    }
}
`,
  csharp: `
using System;
class Program {
    //-------------------------------
    // Example function
    // static int SumArray(int[] arr) {
    //     int sum = 0;
    //     foreach (int num in arr) sum += num;
    //     return sum;
    // }
    //-------------------------------
    static void Main(string[] args) {
        string[] numsStr = Console.ReadLine().Split(' ');
        int[] nums = Array.ConvertAll(numsStr, int.Parse);
        int target = int.Parse(Console.ReadLine());
        // User code starts here
        Console.WriteLine(string.Join(" ", nums) + " " + target);
    }
}
`,
  php: `
<?php
//-------------------------------
// Example function
//function sumArray($arr) {
//    return array_sum($arr);
//}
//-------------------------------
$nums = array_map('intval', explode(' ', trim(fgets(STDIN))));
$target = intval(trim(fgets(STDIN)));
// User code starts here
echo implode(' ', $nums) . ' ' . $target . PHP_EOL;
`,
  cpp: `
#include <iostream>
#include <sstream>
#include <vector>
using namespace std;

//-------------------------------
// Example function
//int sumArray(const vector<int>& arr) {
//    int sum = 0;
//    for (int num : arr) sum += num;
//    return sum;
// }
//-------------------------------
int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<int> nums;
    int num;
    while (ss >> num) nums.push_back(num);
    int target;
    cin >> target;
    // User code starts here
    for (int i = 0; i < nums.size(); ++i) cout << nums[i] << " ";
    cout << target << endl;
    return 0;
}
`,
};
