package net.overthewindow.algorizm.A0508;

import java.util.Scanner;
import java.util.stream.IntStream;

public class Loop {

	private static final Scanner scanner = new Scanner(System.in);
	
	public static void main(String[] args) {
		int n = scanner.nextInt();
		long now = System.currentTimeMillis();
		long end = 0;
		//running time test with foreach and stream.
		
		System.out.println("start : "+now);
		IntStream intStream = IntStream.rangeClosed(1, 10);
		intStream.forEach(i->{System.out.println(n+" x "+i+" = "+(i*n));});
		end = System.currentTimeMillis();
		System.out.println("end : "+end);
		System.out.println("total : "+(end-now)+"msec");
		System.out.println("\n\n\n");
		
		now = System.currentTimeMillis();
		System.out.println("start : "+now);
		for(int i=1;i<=10;i++) {
			System.out.println(n+" x "+i+" = "+(i*n));
		}
		end = System.currentTimeMillis();
		System.out.println("end : "+end);
		System.out.println("total : "+(end-now)+"msec");
		
		//conclusion
		/****
		 * Stream and Foreach are slower than for-loop :)
		 * ***/
	}
}
