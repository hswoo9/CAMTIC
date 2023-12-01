package egovframework.com.devjitsu.system.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.system.repository.MessageRepository;
import egovframework.com.devjitsu.system.service.messageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class messageServiceImpl implements messageService {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(messageServiceImpl.class);

    @Autowired
    private MessageRepository messageRepository;
}
