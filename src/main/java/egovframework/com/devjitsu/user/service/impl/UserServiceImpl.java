package egovframework.com.devjitsu.user.service.impl;

import egovframework.com.devjitsu.user.repository.UserRepository;
import egovframework.com.devjitsu.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Map<String, Object>> getOrgDeptList(Map<String, Object> param) {
        return userRepository.getOrgDeptList(param);
    }

    @Override
    public Map<String, Object> getUserInfo(Map<String, Object> params) {
        return userRepository.getUserInfo(params);
    }

}
