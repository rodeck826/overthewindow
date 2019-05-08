package net.overthewindow.algorizm.A0508;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class LetsReview {
	private static final Scanner scanner = new Scanner(System.in);
	
	public static void main(String[] args) {
		
		int n = scanner.nextInt();
		
		String word = "";
		List<String> result = new ArrayList<>();
		for(int i=0;i<n;i++) {
 			
			String evens="";
			String odds="";
			word = scanner.next();
			for(int j=0;j<word.length();j++) {
				if((j+1)%2==0)evens+=(char)word.charAt(j);
				else if((j+1)%2==1)odds+=(char)word.charAt(j);
			}
			result.add(odds+" "+evens);
		}
		result.stream().forEach(System.out::println);
 		
	}

}
