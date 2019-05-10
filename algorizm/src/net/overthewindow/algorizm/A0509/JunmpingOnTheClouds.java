package net.overthewindow.algorizm.A0509;

import java.util.Scanner;

public class JunmpingOnTheClouds {
	
	private static final Scanner scanner = new Scanner(System.in);
	
	// Complete the jumpingOnClouds function below.
	public static int jumpingOnClouds(int[] c) {
		int count = 0;
		for(int i=0;i<c.length;) {
			if(i==c.length-1) break;
			
			if(i+2<c.length&&c[i+2]==0)i+=2;
			else if(c[i+1]==0)i+=1;
			
			count++;
		}
		
		return count;
	}
	
	public static void main(String[] args) {
		
		int n = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        int[] c = new int[n];

        String[] cItems = scanner.nextLine().split(" ");
        
        for (int i = 0; i < n; i++) {
            int cItem = Integer.parseInt(cItems[i]);
            c[i] = cItem;
        }

        int result = jumpingOnClouds(c);
        System.out.println(result);
        scanner.close();
	}

}
