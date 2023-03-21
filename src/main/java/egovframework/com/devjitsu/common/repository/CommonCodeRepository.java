package egovframework.com.devjitsu.common.repository;

import egovframework.com.devjitsu.main.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CommonCodeRepository extends AbstractDAO {
    /**
     * server Type HwpUrl
     * @param params
     * @return
     */
    public String getHwpCtrlUrl(String params) { return (String) selectOne("commonCode.getHwpCtrlUrl", params);}

    /**
     * Common Code
     */
    public List<Map<String, Object>> getCmGroupCodeList(Map<String, Object> params){ return selectList("commonCode.getCmGroupCodeList", params);}
    public List<Map<String, Object>> getCmCodeList(Map<String, Object> params){ return selectList("commonCode.getCmCodeList", params);}
    public Map<String, Object> getCmGroupCodeInfo(Map<String, Object> params) { return (Map<String, Object>) selectOne("commonCode.getCmGroupCodeInfo", params);}
    public void setCmGroupCodeSave(Map<String, Object> params) { insert("commonCode.setCmGroupCodeSave", params);}
    public void setCmGroupCodeUpdate(Map<String, Object> params) { update("commonCode.setCmGroupCodeUpdate", params);}
    public void setCmCodeSave(Map<String, Object> params){ insert("commonCode.setCmCodeSave", params);}
    public Map<String, Object> getCmCodeInfo(Map<String, Object> params){ return (Map<String, Object>) selectOne("commonCode.getCmCodeInfo", params);}
    public void setCmCodeUpdate(Map<String, Object> params){ update("commonCode.setCmCodeUpdate", params);}
}
