package egovframework.com.devjitsu.cam_manager.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class KukgohRepository extends AbstractDAO {


    public List<Map<String, Object>> getCmmnCodeList(Map<String, Object> params) {

        return selectList("kukgoh.getCmmnCodeList", params);
    }

    public List<Map<String, Object>> getCmmnCodeDetailList(Map<String, Object> params) {

        return selectList("kukgoh.getCmmnCodeDetailList", params);
    }

    public void delCommCodeObject(Map<String, Object> params) {

        delete("kukgoh.delCommCodeObject", params);
    }

    public void insCommCodeObject(Map<String, Object> params) {

        insert("kukgoh.insCommCodeObject", params);
    }
}
