package egovframework.com.devjitsu.system.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.system.repository.BoardManagementRepository;
import egovframework.com.devjitsu.system.service.BoardManagementService;
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
public class BoardManagementServiceImpl implements BoardManagementService {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(BoardManagementServiceImpl.class);

    @Autowired
    private BoardManagementRepository boardManagementRepository;

    @Override
    public List<Map<String, Object>> getBoardList(Map<String, Object> params) {
        return boardManagementRepository.getBoardList(params);
    }

    @Override
    public void setBoard(Map<String, Object> params) {
        if(!StringUtils.isEmpty(params.get("boardId"))){
            boardManagementRepository.setBoardUpd(params);
        }else{
            boardManagementRepository.setBoard(params);
        }

        if(!StringUtils.isEmpty(params.get("boardCategoryActive"))){
            if(params.get("boardCategoryActive").equals("Y")){
                boardManagementRepository.setBoardCategoryDel(params);

                Gson gson = new Gson();
                List<Map<String, Object>> boardCategoryArr = gson.fromJson((String) params.get("boardCategoryArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
                for(Map<String, Object> map : boardCategoryArr){
                    map.put("boardId", params.get("boardId"));
                }

                boardManagementRepository.setBoardCategory(boardCategoryArr);
            }else{
                boardManagementRepository.setBoardCategoryDel(params);
            }
        }
    }

    @Override
    public List<Map<String, Object>> getBoardCategoryList(ArticlePage articlePage) {
        return boardManagementRepository.getBoardCategoryList(articlePage);
    }

    @Override
    public Map<String, Object> getBoardType(Map<String, Object> params) {
        return boardManagementRepository.getBoardType(params);
    }

    @Override
    public Map<String, Object> getBoardActive(Map<String, Object> params) {
        return boardManagementRepository.getBoardActive(params);
    }



}
