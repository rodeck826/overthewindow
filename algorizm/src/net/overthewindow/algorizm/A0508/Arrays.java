package net.overthewindow.algorizm.A0508;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Arrays {
	
	private static final Scanner scanner = new Scanner(System.in);
	
	public static void main(String[] args) {
		Map<Integer,String> data = new HashMap<>();
		int n = scanner.nextInt();
		
		scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");
		
		String[] ns = scanner.nextLine().split(" ");
		for(int i=0;i<n;i++) {
			data.put(i,ns[i]);
		}
		
		data.entrySet().stream().sorted((e1,e2)->{
			return e2.getKey().compareTo(e1.getKey()); 
		})
		.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue,(e1,e2)->e1,LinkedHashMap::new))
		.forEach((k,v)->System.out.print(v+" "));
		
		scanner.close();
	}

}
