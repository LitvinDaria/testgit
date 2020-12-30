/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package comlib;

import java.io.FileWriter;
import java.io.*;
 
public class Foto { 
  public void AddInFileAndBaseInfo(String filePath, String StrInsertData){
     try {
  //Создаем файл и записываем туда строку *StrInsertData
            File file = new File(filePath);
            if (file.createNewFile()) {
                System.out.println("File is created!");
            } else {
                System.out.println("File already exists.");
            } 
            FileWriter writer = new FileWriter(file);
            writer.write(StrInsertData.toString());
            writer.close();

        } catch (Exception e) {
            System.err.println(e);
        }

    }
}