package egovframework.com.devjitsu.doc.process;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public class ProcessRepository extends AbstractDAO {
    public List<Map<String, Object>> getPsCheckList(Map<String, Object> params) {
        return (List<Map<String, Object>>) selectList("process.getPsCheckList", params);
    }
    public Map<String, Object> getAuthorityPsCheck(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("process.getAuthorityPsCheck", params);
    }
}
