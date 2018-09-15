package net.overthewindow.statics.domain;

import java.io.Serializable;

import lombok.Data;

@Data
public class Contact implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -8661277322519249530L;

	private String name;
	
	private String email;
	
	private String subject;
	
	private String context;
	
	
}
