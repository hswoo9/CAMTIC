package egovframework.com.devjitsu.campus.repository;

import egovframework.com.devjitsu.main.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CampusRepository extends AbstractDAO  {
    public List<Map<String, Object>> getCodeList(Map<String, Object> params) {
        return selectList("campus.getCodeList", params);
    }

    public List<Map<String, Object>> getTargetYearList(Map<String, Object> params) {
        return selectList("campus.getTargetYearList", params);
    }

    public List<Map<String, Object>> getTargetOne(Map<String, Object> params) {
        return selectList("campus.getTargetOne", params);
    }

    public List<Map<String, Object>> getTargetList(Map<String, Object> params) {
        return selectList("campus.getTargetList", params);
    }

    public Map<String, Object> getCategoryOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("campus.getCategoryOne", params);
    }

    public List<Map<String, Object>> getTargetCategoryList(Map<String, Object> params) {
        return selectList("campus.getTargetCategoryList", params);
    }

    public List<Map<String, Object>> getTargetCategoryDetailList(Map<String, Object> params) {
        return selectList("campus.getTargetCategoryDetailList", params);
    }

    public List<Map<String, Object>> getEduCategoryList(Map<String, Object> params) {
        return selectList("campus.getEduCategoryList", params);
    }

    public List<Map<String, Object>> getEduCategoryDetailList(Map<String, Object> params) {
        return selectList("campus.getEduCategoryDetailList", params);
    }

    public List<Map<String, Object>> getEduPlanList(Map<String, Object> params) {
        return selectList("campus.getEduPlanList", params);
    }

    public List<Map<String, Object>> getEduPlanOne(Map<String, Object> params) {
        return selectList("campus.getEduPlanOne", params);
    }




    public void setTargetInsert(Map<String, Object> params) {
        insert("campus.setTargetInsert", params);
    }

    public void setTargetDetailInsert(Map<String, Object> params) {
        insert("campus.setTargetDetailInsert", params);
    }

    public void setEduTargetDetailUpdate(Map<String, Object> params) {
        update("campus.setEduTargetDetailUpdate", params);
    }

    public void setTargetDetailDelete(Map<String, Object> params) {
        delete("campus.setTargetDetailDelete", params);
    }

    public void setEduPlanInsert(Map<String, Object> params) {
        insert("campus.setEduPlanInsert", params);
    }

    public void setEduPlanUpdate(Map<String, Object> params) {
        update("campus.setEduPlanUpdate", params);
    }

    public void updateApprStat(Map<String, Object> params) {
        update("campus.updateApprStat", params);
    }
}
