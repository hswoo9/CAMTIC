package egovframework.com.devjitsu.camtic.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ApplicationRepository extends AbstractDAO {

    public void setJoinAccess(Map<String, Object> params){ insert("application.setJoinAccess", params);}
    public Map<String, Object> getApplicationUser(Map<String, Object> params){ return (Map<String, Object>) selectOne("application.getApplicationUser", params);}
    public boolean userAgreeChk(Map<String, Object> params) { return (boolean) selectOne("application.userAgreeChk", params);}
    public void setUserAgree(Map<String, Object> params) { insert("application.setUserAgree", params);}
    public String getUserApplicationId(Map<String, Object> params) { return (String) selectOne("application.getUserApplicationId", params);}
    public boolean getApplicationChk(Map<String, Object> params) { return (boolean) selectOne("application.getApplicationChk", params);}
    public Map<String, Object> getApplicationForm1(Map<String, Object> params){ return (Map<String, Object>) selectOne("application.getApplicationForm1", params);}
    public Map<String, Object> getApplicationFileInfo(Map<String, Object> params){ return (Map<String, Object>) selectOne("application.getApplicationFileInfo", params);}
    public void setApplicationForm1(Map<String, Object> params) { insert("application.setApplicationForm1", params);}
    public void setApplicationForm1Upd(Map<String, Object> params) { update("application.setApplicationForm1Upd", params);}
    public void setApplicationFileUpd(Map<String, Object> params) { update("application.setApplicationFileUpd", params);}
    public void setApplicationSchoolDel(Map<String, Object> params) { delete("application.setApplicationSchoolDel", params);}
    public void setApplicationSchool(Map<String, Object> params) { delete("application.setApplicationSchool", params);}
    public void setApplicationSchoolFileUpd(Map<String, Object> params) { update("application.setApplicationSchoolFileUpd", params);}
    public void setApplicationCareerDel(Map<String, Object> params) { delete("application.setApplicationCareerDel", params);}
    public void setApplicationCareer(Map<String, Object> params) { delete("application.setApplicationCareer", params);}
    public void setApplicationCareerFileUpd(Map<String, Object> params) { update("application.setApplicationCareerFileUpd", params);}
    public List<Map<String, Object>> getApplicationSchool(Map<String, Object> params) { return selectList("application.getApplicationSchool", params);}
    public List<Map<String, Object>> getApplicationCareer(Map<String, Object> params) { return selectList("application.getApplicationCareer", params);}
    public void setApplicationOtherLang(Map<String, Object> params) { update("application.setApplicationOtherLang", params);}

    public void setApplicationCertDel(Map<String, Object> params) { delete("application.setApplicationCertDel", params);}
    public void setApplicationCert(Map<String, Object> params) { insert("application.setApplicationCert", params);}
    public void setApplicationCertFileUpd(Map<String, Object> params) { update("application.setApplicationCertFileUpd", params);}
    public void setApplicationLangDel(Map<String, Object> params) { delete("application.setApplicationLangDel", params);}
    public void setApplicationLang(Map<String, Object> params) { insert("application.setApplicationLang", params);}
    public void setApplicationLangFileUpd(Map<String, Object> params) { update("application.setApplicationLangFileUpd", params);}
    public List<Map<String, Object>> getApplicationCert(Map<String, Object> params) { return selectList("application.getApplicationCert", params);}
    public List<Map<String, Object>> getApplicationLang(Map<String, Object> params) { return selectList("application.getApplicationLang", params);}
    public void setApplicationIntroduce(Map<String, Object> params) { insert("application.setApplicationIntroduce", params);}
    public void setApplicationIntroduceUpd(Map<String, Object> params) { update("application.setApplicationIntroduceUpd", params);}
    public Map<String, Object> getApplicationIntroduce(Map<String, Object> params){ return (Map<String, Object>) selectOne("application.getApplicationIntroduce", params);}
    public void setApplicationMainSaveType(Map<String, Object> params) { update("application.setApplicationMainSaveType", params);}

    public List<Map<String,Object>> getApplicationByRecruitArea(Map<String, Object> params){return selectList("application.getApplicationByRecruitArea",params);}
}
