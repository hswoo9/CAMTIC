package egovframework.com.devjitsu.gw.user.service.impl;

import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.gw.user.repository.UserRepository;
import egovframework.com.devjitsu.gw.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public List<Map<String, Object>> getOrgDeptList(Map<String, Object> param) {
        return userRepository.getOrgDeptList(param);
    }

    @Override
    public Map<String, Object> getUserInfo(Map<String, Object> params) {
        return userRepository.getUserInfo(params);
    }

    @Override
    public Map<String, Object> getIdCheck(Map<String, Object> params) {
        return userRepository.getIdCheck(params);
    }

    @Override
    public List<Map<String, Object>> getEmpList(Map<String, Object> params) {
        return userRepository.getEmpList(params);
    }

    @Override
    public List<Map<String, Object>> getEmpSelList(Map<String, Object> params) {
        return userRepository.getEmpSelList(params);
    }

    public void setUserInfoUpdate(Map<String, Object> params) {
        userRepository.setUserInfoUpdate(params);
    }

    @Override
    public Map<String, Object> getUserPersonnelOne(Map<String, Object> params) {
        return userRepository.getUserPersonnelOne(params);
    }

    @Override
    public Map<String, Object> getUserIdPhotoInfo(Map<String, Object> params) {
        Map<String, Object> infoMap = userRepository.getUserImageInfo(params);

        if(infoMap != null){
            params.put("fileNo", infoMap.get("ID_IMAGE_PK"));
        }

        return commonRepository.getContentFileOne(params);
    }
}
