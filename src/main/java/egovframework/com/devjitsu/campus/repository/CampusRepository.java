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

    public List<Map<String, Object>> getTargetOne(Map<String, Object> params) {
        return selectList("campus.getTargetOne", params);
    }

    public List<Map<String, Object>> getTargetList(Map<String, Object> params) {
        return selectList("campus.getTargetList", params);
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

    public Object setTargetInsert(Map<String, Object> params) {
        return insert("campus.setTargetInsert", params);
    }

    public Object setTargetDetailInsert(Map<String, Object> params) {
        return insert("campus.setTargetDetailInsert", params);
    }

    public Object setTargetDetailDelete(Map<String, Object> params) {
        return insert("campus.setTargetDetailDelete", params);
    }
}
