import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Board from 'react-trello';
// eslint-disable-next-line import/no-unresolved
import Api from 'renderer/Api/auth.api';

interface LaneData {
  id: string;
  title: string;
}
interface LaneCard {
  id: string;
  title: string;
  label: string;
  description: string;
}

export default function Dashboard() {
  const daa = {
    lanes: [],
  };
  const [data, setData] = React.useState(daa);
  const Project = useSelector(({ SelectedProject }: any) => SelectedProject);
  const user = useSelector(({ auth }: any) => auth.user);

  const addLane = async (lanedata: LaneData) => {
    const newLane = {
      title: lanedata.title,
      label: '',
    };
    let res = await Api.AddBoardLane(
      Project.pid,
      newLane,
      user?.accessToken
    ).catch((err) => {
      console.log(err);
    });

    if (res?.status == 200) {
      getLane();
    }
  };
  const updateLane = async (laneId: string, lanedata: LaneData) => {
    const newLane = {
      title: lanedata.title,
      label: '',
      lid: laneId,
    };
    let res = await Api.updateBoardLane(newLane, user?.accessToken).catch(
      (err) => {
        console.log(err);
      }
    );

    if (res?.status == 200) {
      getLane();
    }
  };
  const getLane = async () => {
    debugger;
    let res = await Api.getBoardLane(Project.pid, user?.accessToken).catch(
      (err) => {
        console.log(err);
      }
    );

    if (res?.status == 200) {
      debugger;
      setData({
        lanes: res.data,
      });
    }
  };
  const AddCard = async (cardData: LaneCard, laneId: string) => {
    console.log(cardData);
    let res = await Api.AddBoardCard(laneId, cardData, user?.accessToken).catch(
      (err) => {
        console.log(err);
      }
    );
    if (res?.status == 200) {
      getLane();
    }
  };
  const updateCard = async (laneId: string, cardData: LaneCard) => {
    let newData = {
      title: cardData.title != undefined ? cardData.title : null,
      label: cardData.label != undefined ? cardData.label : null,
      description:
        cardData.description != undefined ? cardData.description : null,
      id: cardData.id,
      laneId: laneId,
    };
    let res = await Api.updateBoardCard(newData, user?.accessToken).catch(
      (err) => {
        console.log(err);
      }
    );
    if (res?.status == 200) {
      getLane();
    }
  };
  const laneDelete = async (laneId: string) => {
    let res = await Api.DeleteBoardLane(laneId, user?.accessToken).catch(
      (err) => {
        console.log(err);
      }
    );
    if (res?.status == 200) {
      getLane();
    }
  };
  const cardDelete = async (cardId: string) => {
    let res = await Api.deleteBoardCard(cardId, user?.accessToken).catch(
      (err) => {
        console.log(err);
      }
    );
    if (res?.status == 200) {
      getLane();
    }
  }

  useEffect(() => {
    if(data.lanes.length == 0){
      getLane();
    }
  }
  , [data.lanes.length]);

    return (
    <div>
      <Board components={{

      }}
      data={data}
      draggable
      editable={true}
      onLaneAdd={addLane}
      id="EditableBoard1"
      onCardAdd={AddCard}
      onCardClick={function noRefCheck(){}}
      onCardDelete={cardDelete}
      onLaneDelete={laneDelete}
      onDataChange={function noRefCheck(){}}
      canAddLanes
      editLaneTitle
      onCardUpdate={updateCard}
      onLaneUpdate={updateLane}
      collapsibleLanes
      style={{backgroundColor:'#f5f5f5'}}

      />
    </div>
    );



