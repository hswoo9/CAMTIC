package egovframework.devjitsu.common.utiles;

import org.springframework.beans.factory.annotation.Value;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PostgreSQL {

    @Value("#{properties['BizboxA.postgreSQL.DriverClassName']}")
    private String DRIVER;

    @Value("#{properties['BizboxA.postgreSQL.Url']}")
    private String URL;


    @Value("#{properties['BizboxA.postgreSQL.UserName']}")
    private String USERNAME;

    @Value("#{properties['BizboxA.postgreSQL.Password']}")
    private String PASSWORD;

    Connection conn = null;

    public void dbConnection(){
        Connection connection = null;
        try{
            DRIVER = "org.postgresql.Driver";
            /*URL = "jdbc:postgresql://127.0.0.1:5432/postgres";
            USERNAME = "postgres";
            PASSWORD = "postgres";*/
            URL = "jdbc:postgresql://10.10.10.90:8817/";
            USERNAME = "eppoltp2";
            PASSWORD = "ahnlab579QW";

            Class.forName(DRIVER);
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            conn = connection;
        }catch (SQLException e){
            e.printStackTrace();
        }
        catch(ClassNotFoundException e){
            e.printStackTrace();
        }
    }

    public void dbClose(){
        try{
            if(conn != null){
                conn.close();
                conn = null;
                System.out.println("PostreSQL Close");
            }
        }catch (SQLException e){
            e.printStackTrace();
        }
    }

    public List<Object> selectList(String sql){

        Statement statement = null;

        Map<String, Object> tempMap = new HashMap<>();
        List<Object> resultList = new ArrayList<>();

        try{
            statement = conn.createStatement();
            ResultSet rs = statement.executeQuery(sql);

            while(rs.next()){
                for(int i = 0 ; i < rs.getMetaData().getColumnCount() ; i++){
                    tempMap.put(rs.getMetaData().getColumnName(i+1), rs.getString(rs.getMetaData().getColumnName(i+1)));
                }
                resultList.add(tempMap);
                tempMap = new HashMap<>();
            }

            rs.close();
            statement.close();

        }catch (SQLException e){
            e.printStackTrace();
        }catch (Exception e){
            e.printStackTrace();
        }finally{
            try{
                if(statement != null){
                    statement.close();
                }
            }catch (SQLException e){
                e.printStackTrace();
            }
        }

        return resultList;
    }
}
