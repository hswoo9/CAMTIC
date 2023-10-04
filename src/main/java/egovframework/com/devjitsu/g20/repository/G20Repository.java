package egovframework.com.devjitsu.g20.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class G20Repository extends AbstractDAO {
    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {

        return selectListMs("g20.getProjectList", params);
    }

    public List<Map<String, Object>> getCommonGisuInfo(Map<String, Object> params) {
        return selectListMs("g20.getCommonGisuInfo", params);
    }

    public List<Map<String, Object>> getSubjectList(Map<String, Object> params) {
        return selectListMs("g20.getBgtList", params);
    }
}
