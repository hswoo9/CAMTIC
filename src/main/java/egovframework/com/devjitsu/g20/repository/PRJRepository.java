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

    public List<Map<String, Object>> getPersonAttendListG20(Map<String, Object> params) {
        return selectListMs("prj.getPersonAttendListG20", params);
    }

    public List<Map<String, Object>> getOffDayListG20(Map<String, Object> params) {
        return selectListMs("prj.getOffDayListG20", params);
    }

    public List<Map<String, Object>> getEduInfoHistList(Map<String, Object> params) {
        return selectListMs("prj.getEduInfoHistList", params);
    }
    public List<Map<String, Object>> getStudyInfoHistList(Map<String, Object> params) {
        return selectListMs("prj.getStudyInfoHistList", params);
    }
    public List<Map<String, Object>> getPropagInfoHistList(Map<String, Object> params) {
        return selectListMs("prj.getPropagInfoHistList", params);
    }
    public List<Map<String, Object>> getOjtInfoHistList(Map<String, Object> params) {
        return selectListMs("prj.getOjtInfoHistList", params);
    }
    public List<Map<String, Object>> getOpenstudyInfoHistList(Map<String, Object> params) {
        return selectListMs("prj.getOpenstudyInfoHistList", params);
    }
    public List<Map<String, Object>> getCommonEduInfoHistList(Map<String, Object> params) {
        return selectListMs("prj.getCommonEduInfoHistList", params);
    }
    public List<Map<String, Object>> getOpenstudyInfoMngHistList(Map<String, Object> params) {
        return selectListMs("prj.getOpenstudyInfoMngHistList", params);
    }
}