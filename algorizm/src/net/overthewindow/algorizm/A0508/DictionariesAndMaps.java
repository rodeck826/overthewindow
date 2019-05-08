package net.overthewindow.algorizm.A0508;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class DictionariesAndMaps {

	private static final Scanner scanner = new Scanner(System.in);
	
	public static void main(String[] args) {
		Map<String,Integer> books = new HashMap<>();
		int n = scanner.nextInt();
		
		for(int i=0;i<n;i++) {
			String name = scanner.next();
            int phone = scanner.nextInt();
			books.put(name, phone);
		}
		while(scanner.hasNext()) {
			String s = scanner.next();
			if(books.containsKey(s))System.out.println(s+"="+books.get(s));
			else System.out.println("Not found");
		}
		
		scanner.close();
		
	}
}
