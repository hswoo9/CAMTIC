package egovframework.com.devjitsu.system.service;

import java.util.Map;

public interface MenuManagementService {

    /**
     * 전체 메뉴 treeView 구조화 Select
     * @return
     */
    String getStringMenuList(Map<String, Object> params);
}
