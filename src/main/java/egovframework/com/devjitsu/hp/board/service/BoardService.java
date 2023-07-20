package egovframework.com.devjitsu.hp.board.service;

import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;

import java.util.Map;

public interface BoardService {


    PagingResponse<PostResponse> selectBoardList(ArticlePage params);

    Map<String, Object> selectBoard(Map<String, Object> params);

    void insertBoard(Map<String, Object> params);

    void updateBoard(Map<String, Object> params);

    void deleteBoard(Map<String, Object> params);


}
