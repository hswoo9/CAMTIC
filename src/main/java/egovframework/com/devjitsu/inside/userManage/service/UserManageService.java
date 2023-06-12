package egovframework.com.devjitsu.inside.userManage.service;
import egovframework.com.devjitsu.inside.userManage.service.Impl.UserManageServiceImpl;

import java.util.List;
import java.util.Map;

public interface UserManageService{
    Map<String,Object> getUserPersonnelRecordList (Map<String,Object> map);
    List<Map<String,Object>> getEducationalList (Map<String,Object> map);
    Map<String,Object> getMilitarySvcInfo (Map<String,Object> map);
    List<Map<String,Object>> getAllUserPersonnelRecordList (Map<String,Object> map);
    List<Map<String,Object>> getCodeList();
}
