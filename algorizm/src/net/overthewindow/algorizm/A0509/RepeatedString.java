package net.overthewindow.algorizm.A0509;

import java.util.Scanner;

/****
 * 
 * 
 * Lilah has a string, , of lowercase English letters that she repeated infinitely many times.

	Given an integer, , find and print the number of letter a's in the first  letters of Lilah's infinite string.
	
	For example, if the string  and , the substring we consider is , the first  characters of her infinite string. There are  occurrences of a in the substring.
	
	Function Description
	
	Complete the repeatedString function in the editor below. It should return an integer representing the number of occurrences of a in the prefix of length  in the infinitely repeating string.
	
	repeatedString has the following parameter(s):
	
	s: a string to repeat
	n: the number of characters to consider
	
	url : https://www.hackerrank.com/challenges/repeated-string/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=warmup&h_r=next-challenge&h_v=zen
	 
 ******/
public class RepeatedString {
	
	private static final Scanner scanner = new Scanner(System.in);
	
	
	// Complete the repeatedString function below.
    static long repeatedString(String s, long n) {
    	long result = 0L;
    	long limit = n%s.length();
    	int bonus = 0; 
    	
    	for(int i=0;i<s.length();i++) {
    		if(s.charAt(i)=='a') {
    			result++;
    			if(i<limit) bonus++;
    		}
    		
    	}
    	return result*(n/s.length())+bonus;
    }
    
    
	public static void main(String[] args) {
		
		String s = scanner.nextLine();
		
		long n = scanner.nextLong();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        long result = repeatedString(s, n);
        System.out.println(result);
        
	}

}
