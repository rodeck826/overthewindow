package net.overthewindow.com.domain;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class Work implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3951545481049482860L;
	
	private int idx;
	
	private String title;
	
	private String contents;
	
	private String tech;
	
	private String note;
	
	private String client;
	
	private int sort;
	
	private List<WorkFile> files;

}
