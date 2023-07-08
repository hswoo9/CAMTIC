package egovframework.com.devjitsu.inside.document.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class DocumentRepository extends AbstractDAO {

    public List<Map<String, Object>> getSnackList(Map<String, Object> params) {
        return selectList("document.getSnackList", params);
    }

    public Map<String, Object> getSnackOne(Map<String, Object> params) {
        return (Map<String, Object>)selectOne("document.getSnackOne", params);
    }

    public void setSnackInsert(Map<String, Object> params) {
        insert("document.setSnackInsert", params);
    }
}
