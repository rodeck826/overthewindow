package net.overthewindow.algorizm.A0508;

import java.util.Scanner;

public class CountingVallys {
	
	
	private static final Scanner scanner = new Scanner(System.in);
	
	public static int countingValleys(int n, String s) {
		int pos = 0;
		int vallyCnt=0;
		boolean isInVally = false;
		for(int i=0;i<s.length();i++) {
			if(s.charAt(i)=='U') pos++;
			else if(s.charAt(i)=='D') pos--;
			
			if(!isInVally&& pos<0) isInVally=true;
			
			if(isInVally && pos>=0) {
				vallyCnt++;
				isInVally=false;
			}
			
		}
		return vallyCnt;
	}
	
	public static void main(String[] args) {
		int n = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        String s = scanner.nextLine();

        int result = countingValleys(n, s);
        System.out.println(result);
	}

}
