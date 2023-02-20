package egovframework.com.devjitsu.user.service.impl;

import egovframework.com.devjitsu.user.repository.UserRepository;
import egovframework.com.devjitsu.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

}
