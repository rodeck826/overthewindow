package net.overthewindow.com.domain;

import java.io.Serializable;

import lombok.Data;

@Data
public class WorkFile implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 227144225116489617L;

	private int fileIdx;
	
	private int workIdx;
	
	private String fileName;
	
	private String filePath;
	
	private String fileType;
	
	
}
