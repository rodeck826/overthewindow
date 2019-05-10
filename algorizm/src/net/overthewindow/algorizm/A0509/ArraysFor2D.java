package net.overthewindow.algorizm.A0509;

import java.util.Scanner;


/*****
 * 
 * 
 * Given a  2D Array, :
 * 
	1 1 1 0 0 0
	0 1 0 0 0 0
	1 1 1 0 0 0
	0 0 0 0 0 0
	0 0 0 0 0 0
	0 0 0 0 0 0
 * We define an hourglass in A to be a subset of values with indices falling in this pattern in arr's graphical representation:
   a b c
  	 d
   e f g
 * 
 * There are  hourglasses in , and an hourglass sum is the sum of an hourglass' values. Calculate the hourglass sum for every hourglass in , then print the maximum hourglass sum.
 * For example, given the 2D array:
	 -9 -9 -9  1 1 1 
	 0 -9  0  4 3 2
	-9 -9 -9  1 2 3
	 0  0  8  6 6 0
	 0  0  0 -2 0 0
	 0  0  1  2 4 0
 * We calculate the following  hourglass values:
 
  -63, -34, -9, 12, 
  -10, 0, 28, 23, 
  -27, -11, -2, 10, 
    9, 17, 25, 18
 * Our highest hourglass value is 28 from the hourglass:

	0 4 3
	  1
	8 6 6
 * 
 * 
 * @author rodeck
 * @date May 9, 2019
 * @desc
 */

public class ArraysFor2D {

	
	private static final Scanner scanner = new Scanner(System.in);
	
	public static int hourglassSum(int[][] arr) {
		int max=Integer.MIN_VALUE;
		
		
		for(int i=0,j=0;i<4&&j<4;i++) {
			int sum = arr[j][i]+arr[j][i+1]+arr[j][i+2]+ arr[j+1][i+1]+arr[j+2][i]+arr[j+2][i+1]+arr[j+2][i+2];
			max = Math.max(max, sum);
			
			
			if(i==3) {
				i=-1;j++;
			}
		}
		
		return max;
	}
	
	public static void main(String[] args) {
		
		int[][] arr = new int[6][6];
		
		
		for (int i = 0; i < 6; i++) {
            String[] arrRowItems = scanner.nextLine().split(" ");
            scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

            for (int j = 0; j < 6; j++) {
                int arrItem = Integer.parseInt(arrRowItems[j]);
                arr[i][j] = arrItem;
            }
        }
		
		int result = hourglassSum(arr);
		System.out.println(result);
	}
}
