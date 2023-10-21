package egovframework.com.devjitsu.cams_pot.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CustomBoardRepository extends AbstractDAO {
	private static final Logger logger = (Logger) LoggerFactory.getLogger(CustomBoardRepository.class);

	public List<PostResponse> getSuggestionSystemList(ArticlePage articlePage){ return selectList("cb.getSuggestionSystemList", articlePage);}
	public Map<String, Object> getSuggestionSystem(Map<String, Object> params) { return (Map<String, Object>) selectOne("cb.getSuggestionSystem", params);}
	public int getSuggestionSystemListCnt(ArticlePage articlePage){ return (int) selectOne("cb.getSuggestionSystemListCnt", articlePage);}
	public String getSuggestionSystemNo(Map<String, Object> params) { return (String) selectOne("cb.getSuggestionSystemNo", params);}
	public void setSuggestionSystem(Map<String, Object> params) { insert("cb.setSuggestionSystem", params);}
	public void setSuggestionSystemUpd(Map<String, Object> params) { update("cb.setSuggestionSystemUpd", params);}
	public void setSuggestionSystemDel(Map<String, Object> params) { update("cb.setSuggestionSystemDel", params);}
	public List<Map<String, Object>> getScheduleList(Map<String, Object> params) { return selectList("cb.getScheduleList", params);}
	public void setScheduleReg(Map<String, Object> params) { insert("cb.setScheduleReg", params);}
	public void setScheduleRegUpd(Map<String, Object> params) { update("cb.setScheduleRegUpd", params);}
	public Map<String, Object> getSchedule(Map<String, Object> params) { return (Map<String, Object>) selectOne("cb.getSchedule", params);}
	public List<PostResponse> getRequestBoardList(ArticlePage articlePage){ return selectList("cb.getRequestBoardList", articlePage);}
	public int getRequestBoardListCnt(ArticlePage articlePage){ return (int) selectOne("cb.getRequestBoardListCnt", articlePage);}
	public void setRequestBoard(Map<String, Object> params) { insert("cb.setRequestBoard", params);}
	public void setRequestBoardUpd(Map<String, Object> params) { update("cb.setRequestBoardUpd", params);}
	public Map<String, Object> getRequestBoard(Map<String, Object> params) { return (Map<String, Object>) selectOne("cb.getRequestBoard", params);}
	public void setRequestBoardStatusUpd(Map<String, Object> params) { update("cb.setRequestBoardStatusUpd", params);}
	public void setRequestBoardDel(Map<String, Object> params) { update("cb.setRequestBoardDel", params);}
}
