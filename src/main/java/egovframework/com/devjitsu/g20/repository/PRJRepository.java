package egovframework.com.devjitsu.g20.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class PRJRepository extends AbstractDAO {
    public List<Map<String, Object>> getHistEngnList(Map<String, Object> params) {
        return selectListMs("prj.getHistEngnList", params);
    }

    public List<Map<String, Object>> getHistRndList(Map<String, Object> params) {
        return selectListMs("prj.getHistRndList", params);
    }

    public List<Map<String, Object>> getHistEduList(Map<String, Object> params) {
        return selectListMs("prj.getHistEduList", params);
    }

    public List<Map<String, Object>> getRecruitHistList(Map<String, Object> params) {
        return selectListMs("prj.getRecruitHistList", params);
    }

    public List<Map<String, Object>> getHistPurcList(Map<String, Object> params) {
        return selectListMs("prj.getHistPurcList", params);
    }
}