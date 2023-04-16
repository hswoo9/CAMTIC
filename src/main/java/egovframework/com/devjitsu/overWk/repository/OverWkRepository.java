package egovframework.com.devjitsu.overWk.repository;

import egovframework.com.devjitsu.main.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class OverWkRepository extends AbstractDAO {

    public List<Map<String, Object>> getWorkCodeList(Map<String, Object> params) { return selectList("overWk.getWorkCodeList", params);}

    public List<Map<String, Object>> getOverWorkPlanReqList(Map<String, Object> params) { return selectList("overWk.getOverWorkPlanReqList", params);}
}
