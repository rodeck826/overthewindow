package net.overthewindow.algorizm.A0508;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Scanner;
import java.util.concurrent.atomic.AtomicInteger;

public class SockMerchant {

	private static final Scanner scanner = new Scanner(System.in);
	
	// Complete the sockMerchant function below.
    static int sockMerchant(int n, int[] ar) {
    	AtomicInteger cnt = new AtomicInteger(0);
    	Map<Integer,Integer> data = new HashMap<>();
    	for(int i=0;i<n;i++) {
    		data.put(ar[i], Optional.ofNullable(data.get(ar[i])).orElse(0)+1);
    	}
    	
    	data.forEach((k,v)->{
    		int d = v/2;
    		cnt.set(cnt.get()+d);
    	});
    	
    	return cnt.get();

    }
	public static void main(String[] args) {
		int n = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        int[] ar = new int[n];

        String[] arItems = scanner.nextLine().split(" ");

        for (int i = 0; i < n; i++) {
            int arItem = Integer.parseInt(arItems[i]);
            ar[i] = arItem;
        }

        int result = sockMerchant(n, ar);
        System.out.println("result:"+result);
        scanner.close();
	}
}
